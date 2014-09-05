package hello.container;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.yarn.annotation.OnContainerStart;
import org.springframework.yarn.annotation.YarnComponent;

@YarnComponent
public class SenderPojo {

	private static final Log log = LogFactory.getLog(SenderPojo.class);

	private final static String queueName = "demo";

	@Autowired
	private RabbitTemplate rabbitTemplate;

	@OnContainerStart
	public void send() throws Exception {
		log.info("Sending messages to queue " + queueName);

		int count = 0;
        for (int j = 0; j<600; j++) {
            for (int i = 0; i<100; i++) {
                rabbitTemplate.convertAndSend(queueName, "Hello from producer " + count++);
            }
    		log.info("Sent 100 messages");
            Thread.sleep(1000);
        }

	}

}
