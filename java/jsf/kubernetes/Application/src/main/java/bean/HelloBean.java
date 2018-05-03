package bean;

import java.io.Serializable;
import java.util.Date;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import javax.annotation.PostConstruct;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;

import redis.clients.jedis.*;

@ManagedBean
@SessionScoped
public class HelloBean  implements Serializable {

	private static final long serialVersionUID = -4823295172962937652L;
	private String message = "";
	private String _defaultMessageFormat = "Total Visits: %s. Last Visit: %s";
	private Jedis jedis = null; 

	@PostConstruct
   	public void init() {
		try {
			this.jedis = new Jedis(new URI("redis://redis-cache:6379"));
		} catch (URISyntaxException ex) {
			System.out.println(ex.toString());
			return;	
		}

		if (!this.jedis.exists("viewCount")) {
			this.jedis.set("viewCount", "0");
		}
    	
		this.jedis.set("lastVisit", (new Date()).toString());
    }
	
	public String getMessage() {
		if (this.jedis != null) {
			String viewCount = this.jedis.get("viewCount");
			String lastVisit = this.jedis.get("lastVisit");
			this.setMessage(String.format(this._defaultMessageFormat, viewCount, lastVisit));
		}
		
		return this.message;
	}

	public void setMessage(String message) {
		if (this.jedis != null) {
			this.jedis.incr("viewCount");
			this.jedis.set("lastVisit", (new Date()).toString());
		}
		
		this.message = message;
	}	

}
