package bean;

import java.io.Serializable;

import javax.enterprise.context.SessionScoped;
import javax.inject.Named;

@Named
@SessionScoped
public class HelloBean implements Serializable {

	private static final long serialVersionUID = -4823295172962937652L;
	
	private String message = "Your Java app is up and running on Azure";
	
	
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}	
}
