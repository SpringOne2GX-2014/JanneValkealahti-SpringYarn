package hello.appmaster;

import java.net.URI;
import java.nio.charset.Charset;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.amqp.RabbitProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.jayway.jsonpath.JsonPath;

@Controller
@RequestMapping("/demo")
@EnableConfigurationProperties({ RabbitProperties.class })
public class DemoController {

	@Autowired
	private RabbitProperties props;

	@RequestMapping(method = RequestMethod.GET)
	public String home(
			@RequestParam(value = "queue", required = false, defaultValue = "demo") String queue,
			Model model) {
		model.addAttribute("queue", queue);
		return "home";
	}

	@RequestMapping("/data")
	public Object data(
			@RequestParam(value = "queue", required = false, defaultValue = "demo") String queue)
			throws Exception {

		UriComponents uriComponents = UriComponentsBuilder.newInstance().scheme("http")
				.host(props.getHost())
				.port(15672)
				.pathSegment("api", "queues", escSlash(props.getVirtualHost()), queue)
				.queryParam("lengths_age", 600)
				.queryParam("lengths_incr", 5)
				.queryParam("msg_rates_age", 600)
				.queryParam("msg_rates_incr", 5)
				.build();

		RestTemplate template = new RestTemplate();
		ResponseEntity<String> exchange = template.exchange(new URI(uriComponents.toUriString()), HttpMethod.GET,
				new HttpEntity<String>(createHeaders(props.getUsername(), props.getPassword())),
				String.class);
		return new ResponseEntity<Object>(JsonPath.read(exchange.getBody(), "$.messages_details.samples"),
				HttpStatus.OK);
	}

	@SuppressWarnings("serial")
	private static HttpHeaders createHeaders(final String username, final String password) {
		return new HttpHeaders() {
			{
				String auth = username + ":" + password;
				byte[] encodedAuth = Base64.encodeBase64(auth.getBytes(Charset.forName("US-ASCII")));
				String authHeader = "Basic " + new String(encodedAuth);
				set("Authorization", authHeader);
			}
		};
	}
	
	private static String escSlash(String text) {
		return text.replaceAll("/", "%2F");
	}

}
