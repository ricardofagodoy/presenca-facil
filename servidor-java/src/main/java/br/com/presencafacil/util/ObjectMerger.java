package br.com.presencafacil.util;

public class ObjectMerger {

	/* public static void merge(Object a, Object b, Class clazz) throws Exception {

		if (a == null || b == null || clazz == null)
			throw new Exception("Null parameters!");
		
		if (a.getClass().equals(b.getClass()) == false)
			throw new Exception("A and B are not same class type!");
		
		if (a.getClass().equals(clazz) == false)
			throw new Exception("Class type different from object's class!");
		
		Field[] fields = clazz.getFields();

		for (Field field : fields) {
			Object value = field.get(b);
			
			if (value != null)
				field.set(a, value);
		}
	} */
}
