package hello.container;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.hadoop.conf.Configuration;
import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.hadoop.fs.FsShell;

public class HdfsTasklet implements Tasklet {

	private static final Log log = LogFactory.getLog(HdfsTasklet.class);

	@Autowired
	private Configuration configuration;

	@Override
	public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
		String fileName = chunkContext.getStepContext().getStepName().replaceAll("\\W", "");
		FsShell shell = new FsShell(configuration);
		boolean exists = shell.test("/tmp/" + fileName);
		shell.close();
		if (exists) {
			log.info("File /tmp/" + fileName + " exist");
			log.info("Hello from HdfsTasklet ok");
			return RepeatStatus.FINISHED;
		} else {
			log.info("Hello from HdfsTasklet fail");
			throw new RuntimeException("File /tmp/" + fileName + " does't exist");
		}
	}

}
