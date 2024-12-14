package com.goormthon.backend.dto.req;

import lombok.Getter;

@Getter
public class UserUpdateRequestDto {
  private Long id;
  private String nickname;
  private String email;
  private String password;
}
