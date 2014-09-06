package hello.container;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class Receiver {

	private static final Log log = LogFactory.getLog(Receiver.class);

	public void receiveMessage(String message) throws Exception {
        log.info("Received <" + message + ">");
        // sleep to simulate slow processing
        Thread.sleep(20);
    }

}
