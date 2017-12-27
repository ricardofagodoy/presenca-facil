package br.com.presencafacil.service;

import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface JpaCrudInterface<T, I> {
	T findOne(I id);
	T load(I id);
	boolean exists(I id);
	List<T> findAll();
	T save(T t) throws Exception;
	void delete(I i);

    @Transactional(rollbackFor = {Exception.class})
    List<T> saveList(List<T> list);
}

