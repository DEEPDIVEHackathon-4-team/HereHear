package com.goormthon.backend.dto.req;

import lombok.Getter;

@Getter
public class UserReq {
  private Long id;
  private String nickname;
  private String email;
  private String password;
}
