package br.com.presencafacil.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.presencafacil.model.entity.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	Usuario findByLoginUsuario(String usuario);
	
	@Query("SELECT u.login.senha FROM Usuario u WHERE u.id = ?1")
	String findSenhaByUsuarioId(Long id);
}
