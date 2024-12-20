package com.goormthon.backend.dto.req;

import com.goormthon.backend.entity.Category;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddPosterReq {
  private Category category;
  private String title;
  private Long userId;
  private String contents;
  private Double latitude;
  private Double longitude;
  private String regionName;
}
