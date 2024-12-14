package com.goormthon.backend.dto.req;

import lombok.Getter;

@Getter
public class UserRegisterRequestDto {
	private String nickname;
	private String email;
	private String password;
}
