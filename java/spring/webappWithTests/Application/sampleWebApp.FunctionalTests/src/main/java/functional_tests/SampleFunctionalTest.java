package functional_tests;

import org.junit.*;

import org.openqa.selenium.NoAlertPresentException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import static org.junit.Assert.assertEquals;

import java.nio.file.Paths;
import java.util.concurrent.TimeUnit;

public class SampleFunctionalTest {
    
	private static WebDriver driver;

    @Before
    public void startBrowser() {
        String path = Paths.get(System.getenv("ChromeWebDriver"), "chromedriver.exe").toString();
	    System.setProperty("webdriver.chrome.driver", path);
	    ChromeOptions options = new ChromeOptions();
	    options.addArguments("--no-sandbox");
	    driver = new ChromeDriver(options);
	    driver.manage().timeouts().pageLoadTimeout(120, TimeUnit.SECONDS);
    }
	
    @Test(timeout = 600000)
    public void testAssertTitleWithSelenium() throws InterruptedException, AssertionError {
        if (isAlertPresent()) {
            System.out.println(isAlertPresent());
            driver.switchTo().alert().accept();
        }
        int numRetries = 5;
        for (int i = 0; i < numRetries; i++)
        {
            try
            {
                driver.get(System.getProperty("webAppUrl"));
                assertEquals("Java Spring Application", driver.getTitle());
                break;
            }
            catch(AssertionError e)
            {
                if(i == (numRetries - 1))
                {
                    throw e;
                }
                Thread.sleep(5000);
            }
        }
    }
    
    protected boolean isAlertPresent() {
        try {
            driver.switchTo().alert();
            return true;
        } catch (NoAlertPresentException e) {
            return false;
        }
    }
    
    @After
    public void tearDown() {
    	try {
            driver.quit();
    	} catch(Exception e) {
    		
    	}
    }
}