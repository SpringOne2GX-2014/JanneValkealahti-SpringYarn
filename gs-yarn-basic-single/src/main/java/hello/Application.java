package hello;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Profile;
import org.springframework.data.hadoop.fs.FsShell;
import org.springframework.yarn.annotation.OnContainerStart;
import org.springframework.yarn.annotation.YarnComponent;

@ComponentScan
@EnableAutoConfiguration
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@YarnComponent
	@Profile("container")
	public static class HelloPojo {

		private static final Log log = LogFactory.getLog(HelloPojo.class);

		@Autowired
		private Configuration configuration;

		@OnContainerStart
		public void onStart() throws Exception {
			log.info("Hello from HelloPojo");
			log.info("About to list from hdfs root content");

			FsShell shell = new FsShell(configuration);
			for (FileStatus s : shell.ls(false, "/")) {
				log.info(s);
			}
			shell.close();
		}

	}

}
