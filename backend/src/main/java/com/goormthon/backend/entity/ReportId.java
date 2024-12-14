package com.goormthon.backend.entity;

import java.io.Serializable;
import lombok.Getter;

@Getter
public class ReportId implements Serializable {
	private Long poster;
	private Long user;
}