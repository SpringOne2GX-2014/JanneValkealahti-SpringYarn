package hello;

import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.greaterThan;
import hello.client.ClientApplication;

import java.io.File;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.apache.hadoop.yarn.api.records.YarnApplicationState;
import org.hsqldb.Server;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.core.io.Resource;
import org.springframework.data.hadoop.fs.FsShell;
import org.springframework.yarn.boot.test.junit.AbstractBootYarnClusterTests;
import org.springframework.yarn.test.context.MiniYarnClusterTest;
import org.springframework.yarn.test.junit.ApplicationInfo;
import org.springframework.yarn.test.support.ContainerLogUtils;

@MiniYarnClusterTest
public class AppIT extends AbstractBootYarnClusterTests {

	@Test
	public void testApp() throws Exception {
		FsShell shell = new FsShell(getConfiguration());
		shell.touchz("/tmp/remoteStep1partition0");
		shell.touchz("/tmp/remoteStep1partition1");

		ApplicationInfo info1 = submitApplicationAndWait(ClientApplication.class, new String[0], 2, TimeUnit.MINUTES);
		assertThat(info1.getYarnApplicationState(), is(YarnApplicationState.FINISHED));
		assertLogs(ContainerLogUtils.queryContainerLogs(getYarnCluster(), info1.getApplicationId()), 10, 2, 2);

		shell.touchz("/tmp/remoteStep2partition0");
		shell.touchz("/tmp/remoteStep2partition1");
		shell.close();

		ApplicationInfo info2 = submitApplicationAndWait(ClientApplication.class, new String[0], 2, TimeUnit.MINUTES);
		assertThat(info2.getYarnApplicationState(), is(YarnApplicationState.FINISHED));
		assertLogs(ContainerLogUtils.queryContainerLogs(getYarnCluster(), info2.getApplicationId()), 6, 2, 0);
	}

	private void assertLogs(List<Resource> resources, int numResources, int numOk, int numFail) throws Exception {
		int ok = 0;
		int fail = 0;
		assertThat(resources, notNullValue());
		assertThat(resources.size(), is(numResources));
		for (Resource res : resources) {
			File file = res.getFile();
			String content = ContainerLogUtils.getFileContent(file);
			if (file.getName().endsWith("stdout")) {
				assertThat(file.length(), greaterThan(0l));
				if (file.getName().equals("Container.stdout")) {
					assertThat(content, containsString("Hello from HdfsTasklet"));
					if (content.contains("Hello from HdfsTasklet ok")) {
						ok++;
					}
					if (content.contains("Hello from HdfsTasklet fail")) {
						fail++;
					}
				}
			} else if (file.getName().endsWith("stderr")) {
				assertThat("stderr file is not empty: " + content, file.length(), is(0l));
			}
		}
		assertThat("Failed to find ok's from logs", ok, is(numOk));
		assertThat("Failed to find fail's from logs", fail, is(numFail));
	}

	private Server server = null;

	@Before
	public void startDb() {
		if (server == null) {
			server = new Server();
			server.setSilent(false);
			server.setTrace(true);
			server.setDatabaseName(0, "testdb");
			server.setDatabasePath(0, "mem:testdb");
			server.start();
		}
	}

	@After
	public void stopDb() {
		if (server != null) {
			server.stop();
			server = null;
		}
	}

}
