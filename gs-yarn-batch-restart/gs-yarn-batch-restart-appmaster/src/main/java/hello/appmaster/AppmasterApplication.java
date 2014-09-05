package hello.appmaster;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParametersIncrementer;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.core.partition.PartitionHandler;
import org.springframework.batch.core.partition.support.Partitioner;
import org.springframework.batch.core.partition.support.SimplePartitioner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.yarn.batch.config.EnableYarnBatchProcessing;
import org.springframework.yarn.batch.partition.StaticPartitionHandler;

@Configuration
@EnableAutoConfiguration
@EnableYarnBatchProcessing
public class AppmasterApplication {

	@Autowired
	private JobBuilderFactory jobFactory;

	@Autowired
	private StepBuilderFactory stepFactory;

	@Bean
	public Job job() throws Exception {
		return jobFactory.get("job")
			.incrementer(jobParametersIncrementer())
			.start(master1())
			.next(master2())
			.build();
	}

	@Bean
	public JobParametersIncrementer jobParametersIncrementer() {
		return new RunIdIncrementer();
	}

	@Bean
	protected Step master1() throws Exception {
		return stepFactory.get("master1")
			.partitioner("remoteStep1", partitioner())
			.partitionHandler(partitionHandler1())
			.build();
	}

	@Bean
	protected Step master2() throws Exception {
		return stepFactory.get("master2")
			.partitioner("remoteStep2", partitioner())
			.partitionHandler(partitionHandler2())
			.build();
	}

	@Bean
	protected Partitioner partitioner() {
		return new SimplePartitioner();
	}

	@Bean
	protected PartitionHandler partitionHandler1() {
		StaticPartitionHandler handler = new StaticPartitionHandler();
		handler.setStepName("remoteStep1");
		handler.setGridSize(2);
		return handler;
	}

	@Bean
	protected PartitionHandler partitionHandler2() {
		StaticPartitionHandler handler = new StaticPartitionHandler();
		handler.setStepName("remoteStep2");
		handler.setGridSize(2);
		return handler;
	}

	public static void main(String[] args) {
		SpringApplication.run(AppmasterApplication.class, args);
	}

}
