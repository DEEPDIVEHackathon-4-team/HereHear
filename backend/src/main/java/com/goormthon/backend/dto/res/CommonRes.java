package com.goormthon.backend.dto.res;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommonRes <T>{
  private int code;
  private String msg;
  private T data;
}
