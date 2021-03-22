package com.formation.jp.dao;
//class DAO qui ne contient que les methode d'acces à la BD
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.formation.jp.entities.Personne;
import com.formation.jp.utils.ConnexionUtile;

public class PersonneDao {
	//ajouter un objet de type personne 
	public void save(Personne personne) throws ClassNotFoundException, SQLException {
		String sql="insert into personne(cin,nom,prenom,adresse,email) values(?,?,?,?,?)";
		PreparedStatement statement = ConnexionUtile.getInstance().getConnection().prepareStatement(sql);
		statement.setString(1, personne.getCin());
		statement.setString(2, personne.getNom());
		statement.setString(3, personne.getPrenom());
		statement.setString(4, personne.getAdresse());
		statement.setString(5, personne.getEmail());
		statement.executeUpdate();
	}
	
	
	//mise à jour d'un objet
	public void update(Personne personne) throws ClassNotFoundException, SQLException {
		String sql="update personne set nom=?, prenom=?, adresse=?, email=? where cin=?";
		PreparedStatement statement = ConnexionUtile.getInstance().getConnection().prepareStatement(sql);
		statement.setString(5, personne.getCin());
		statement.setString(1, personne.getNom());
		statement.setString(2, personne.getPrenom());
		statement.setString(3, personne.getAdresse());
		statement.setString(4, personne.getEmail());
		statement.executeUpdate();
	}
	
	
	//supression d'un objet
	public void delete(String cin) throws SQLException, ClassNotFoundException {
		String sql="delete from personne  where cin=?";
		PreparedStatement statement = ConnexionUtile.getInstance().getConnection().prepareStatement(sql);
		statement.setString(1, cin);

		statement.executeUpdate();
	}
	

	//afficher tous les objet
	public List<Personne> findAll() throws ClassNotFoundException, SQLException{
		String sql="select * from personne";
		PreparedStatement statement = ConnexionUtile.getInstance().getConnection().prepareStatement(sql);

		ResultSet result = statement.executeQuery();
		List<Personne> list = new ArrayList<>();
		while(result.next()){
			Personne personne= new Personne();//pour affichier tout les element du tableau
			personne.setCin(result.getString("cin"));
			personne.setNom(result.getString("nom"));
			personne.setPrenom(result.getString("prenom"));
			personne.setAdresse(result.getString("adresse"));
			personne.setEmail(result.getString("email"));
			list.add(personne);
		}
		return list;
	}

	
	//recherche d'un objet avec un attribut primaire cin dans nos cas
	public Personne findByCin(String cin) throws ClassNotFoundException, SQLException{
		String sql="select * from personne where cin=?";
		PreparedStatement statement = ConnexionUtile.getInstance().getConnection().prepareStatement(sql);
		statement.setString(1, cin);
		ResultSet result = statement.executeQuery();
		
		while(result.next()){
			Personne personne= new Personne();//pour affichier tout les element du tableau
			personne.setCin(result.getString("cin"));
			personne.setNom(result.getString("nom"));
			personne.setPrenom(result.getString("prenom"));
			personne.setAdresse(result.getString("adresse"));
			personne.setEmail(result.getString("email"));
			return personne;
		}
		return null;
	}
	
	
	//recherche d'un objet a par un attribut normale(email dans no cas)
	public List<Personne> findByEmail(String email) throws ClassNotFoundException, SQLException{
		String sql="select * from personne where email=?";
		PreparedStatement statement = ConnexionUtile.getInstance().getConnection().prepareStatement(sql);
		statement.setString(1,email);
		ResultSet result = statement.executeQuery();
		List<Personne> list = new ArrayList<>();
		while(result.next()){
			Personne personne= new Personne();//pour affichier tout les element du tableau
			personne.setCin(result.getString("cin"));
			personne.setNom(result.getString("nom"));
			personne.setPrenom(result.getString("prenom"));
			personne.setAdresse(result.getString("adresse"));
			personne.setEmail(result.getString("email"));
			list.add(personne);
		}
		return list;
	}
	
	
	//recherche d'un objket à partire deux attribut
	public List<Personne> findByEmail(String email, String cin) throws ClassNotFoundException, SQLException{
		String sql="select * from personne where email=? and cin=?";
		PreparedStatement statement = ConnexionUtile.getInstance().getConnection().prepareStatement(sql);
		statement.setString(1,email);
		statement.setString(2,cin);
		ResultSet result = statement.executeQuery();
		List<Personne> list = new ArrayList<>();
		while(result.next()){
			Personne personne= new Personne();//pour affichier tout les element du tableau
			personne.setCin(result.getString("cin"));
			personne.setNom(result.getString("nom"));
			personne.setPrenom(result.getString("prenom"));
			personne.setAdresse(result.getString("adresse"));
			personne.setEmail(result.getString("email"));
			list.add(personne);
		}
		return list;
	}




}
