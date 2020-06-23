package com.myapp.root;

import static org.junit.Assert.assertTrue;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class RootApplicationTests {

	@Test
	public void contextLoads() {
	}

	@Test
	public void sampleTest() {
		assertTrue("Sample test", true);
	}
}
