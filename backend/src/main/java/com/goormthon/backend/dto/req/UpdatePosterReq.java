package com.goormthon.backend.dto.req;


import com.goormthon.backend.entity.Category;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatePosterReq {
  private Long id;
  private Category category;
  private String title;
  private Long userId;
  private String contents;
  // private String location;
}
