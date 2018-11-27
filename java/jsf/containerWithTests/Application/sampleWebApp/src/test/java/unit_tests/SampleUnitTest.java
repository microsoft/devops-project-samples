package unit_tests;

import java.io.File;
import java.nio.file.Paths;

import org.junit.jupiter.api.*;
import org.richfaces.test.AbstractFacesTest;
import org.richfaces.test.LocalWebClient;

import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.HtmlPage;

public class SampleUnitTest extends AbstractFacesTest {
	
    @Override  
    protected void setupWebContent() {  
        String webappDirectory = Paths.get(System.getProperty("user.dir"), "src/main/webapp").toString();      
        File webFile = new File(webappDirectory);  
        facesServer.addResourcesFromDirectory("/", webFile);  
    }  

    @Test  
    public void testTitleAssert() throws Exception {  
        WebClient webClient = new LocalWebClient(facesServer);
        HtmlPage page = webClient.getPage("http://localhost/index.jsf");
        assertEquals("Sample JSF Application", page.getTitleText());  
    }  
}