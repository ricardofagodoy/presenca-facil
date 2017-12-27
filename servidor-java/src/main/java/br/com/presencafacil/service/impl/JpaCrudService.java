package br.com.presencafacil.service.impl;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.presencafacil.service.JpaCrudInterface;
import org.springframework.transaction.annotation.Transactional;

public abstract class JpaCrudService<T, I extends Serializable> implements JpaCrudInterface<T, I> {
	
	private JpaRepository<T, I> jpaRepository;
	
	public JpaCrudService(JpaRepository<T, I> crudRepository) {
		this.jpaRepository = crudRepository;
	}
	
	@Override
	public T findOne(I id) {
		return this.jpaRepository.findOne(id);
	}
	
	@Override
	public T load(I id) {
		return this.jpaRepository.getOne(id);
	}
	
	@Override
	public boolean exists(I id) {
		return this.jpaRepository.exists(id);
	}
	
	@Override
	public List<T> findAll() {
		return (List<T>) this.jpaRepository.findAll();
	}
	
	@Override
	public T save(T t) {
		return this.jpaRepository.save(t);
	}
	
	@Override
	public void delete(I id) {
		this.jpaRepository.delete(id);
	}

    @Override
	@Transactional(rollbackFor = {Exception.class})
	public List<T> saveList(List<T> list) {
		if (list == null)
			return null;

		for (int i = 0; i < list.size(); i++) {
			try {
				this.save(list.get(i));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		return null;
	}
}
