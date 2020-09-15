package com.devsuperior.dspesquisa.dto;

import java.io.Serializable;

import com.devsuperior.dspesquisa.entities.Game;
import com.devsuperior.dspesquisa.entities.enums.Platform;

public class GameDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String title;
	private Platform platfrom;
	
	public GameDTO() {
	}
	
	public GameDTO(Game entity) {
		this.id = entity.getId();
		this.title = entity.getTitle();
		this.platfrom = entity.getPlatform();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Platform getPlatfrom() {
		return platfrom;
	}

	public void setPlatfrom(Platform platfrom) {
		this.platfrom = platfrom;
	}
	
	
}
