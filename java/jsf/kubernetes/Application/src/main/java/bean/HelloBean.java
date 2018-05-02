package bean;

import java.io.Serializable;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.exceptions.JedisException;

@ManagedBean
@SessionScoped
public class HelloBean  implements Serializable{

	private static final long serialVersionUID = -4823295172962937652L;
	
	private String message = "Your Java app is up and running on Azure";

	public String getMessage() {
		Jedis jedis = new Jedis("redis-cache",6379 );
		String value = jedis.get("foo");
		return value;
	}

	public void setMessage(String message) {
		Jedis jedis = new Jedis("redis-cache",6379);
		jedis.set("foo", "barjsf1");
		this.message = message;
	}	

}
