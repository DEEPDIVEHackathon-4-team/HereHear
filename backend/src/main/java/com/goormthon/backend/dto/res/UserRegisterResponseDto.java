package com.goormthon.backend.dto.res;

import com.goormthon.backend.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRegisterResponseDto {
	private Long id;
	private String nickname;

	@Builder
	public static UserRegisterResponseDto of(User user) {
		return UserRegisterResponseDto.builder()
			.id(user.getId())
			.nickname(user.getNickname())
			.build();
	}
}

