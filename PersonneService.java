package com.formation.jp.services;
//class service qui contient les condition d'utilisation des méthode de la classe DAO
import java.sql.SQLException;
import java.util.List;

import com.formation.jp.dao.PersonneDao;
import com.formation.jp.entities.Personne;
import com.formation.jp.model.MessageResponse;

public class PersonneService {
	private PersonneDao personneDao = new PersonneDao();
	
	
	public MessageResponse save (Personne personne) throws ClassNotFoundException, SQLException{
		Personne pers = personneDao.findByCin(personne.getCin());
		if(pers !=null){
			return new MessageResponse(false,"Cin existent!");
		}
		List<Personne> list= personneDao.findByEmail(personne.getEmail());
		if (!list.isEmpty()){
			return new MessageResponse(false,"Email existent!");
		}
		personneDao.save(personne);
		return new MessageResponse(true,"Opération éffectuer avec succès");
	}

	
	public MessageResponse update (Personne personne) throws ClassNotFoundException, SQLException{
		List<Personne> list = personneDao.findByEmail(personne.getEmail(), personne.getCin());
		if (list.isEmpty()){
			list= personneDao.findByEmail(personne.getEmail());
			if (!list.isEmpty()){
				return new MessageResponse(false,"Email existent!");
			}
		}
		personneDao.update(personne);
		return new MessageResponse(true,"Opération éffectuer avec succès");
	}

	
	public MessageResponse delete(String cin) throws ClassNotFoundException, SQLException{
		Personne pers = personneDao.findByCin(cin);
		if(pers ==null){
			return new MessageResponse(false,"Cin inexistent!");
		}
		personneDao.delete(cin);
		return new MessageResponse(true,"Opération éffectuer avec succès");
		
	}

	
	public List<Personne> findAll() throws ClassNotFoundException, SQLException{
		return personneDao.findAll();
	}
	
	
	public Personne findByCin(String cin) throws ClassNotFoundException, SQLException{
		return personneDao.findByCin(cin);
	}
	
	
	
	
}
