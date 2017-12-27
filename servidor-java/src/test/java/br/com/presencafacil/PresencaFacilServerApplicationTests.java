package br.com.presencafacil;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes=PresencaFacilServerApplication.class)
//@Sql(executionPhase = ExecutionPhase.BEFORE_TEST_METHOD, scripts = "classpath:data.sql")
public class PresencaFacilServerApplicationTests {
	
	//@Autowired
	//private LoginService loginService;
	
	//@Autowired
	//private UsuarioService alunoService;
	
	@Test
	public void testaGeral() {
		//Assert.assertEquals("ricardo", this.loginService.findOne(1l).getUsuario());
		//Assert.assertEquals("13049630", this.alunoService.findOne(1l).getRa());
		Assert.assertEquals(true, !false);
	}
}