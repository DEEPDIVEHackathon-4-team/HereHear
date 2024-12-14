package com.goormthon.backend.dto.res;

import java.util.List;

import com.goormthon.backend.dto.Location;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRes {
  private Long id;
  private String name;
  private List<Location> location;
}
