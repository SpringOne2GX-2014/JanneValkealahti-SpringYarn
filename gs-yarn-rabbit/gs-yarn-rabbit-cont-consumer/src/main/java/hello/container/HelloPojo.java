package hello.container;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.yarn.annotation.OnContainerStart;
import org.springframework.yarn.annotation.YarnComponent;

@YarnComponent
public class HelloPojo {


	private static final Log log = LogFactory.getLog(HelloPojo.class);

	@OnContainerStart
	public void publicVoidNoArgsMethod() throws Exception {
		log.info("Just waiting next 30 min");
		Thread.sleep(1000*60*30);
	}

}
