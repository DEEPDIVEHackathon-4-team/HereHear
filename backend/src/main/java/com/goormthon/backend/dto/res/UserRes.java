package com.goormthon.backend.dto.res;

import java.util.List;

import com.goormthon.backend.entity.Location;
import com.goormthon.backend.entity.Region;
import com.goormthon.backend.entity.User;

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
  private String nickname;
  private Location location;
  private Integer hearRate;
  private Region region;

  @Builder
  public static UserRes of(User user) {
    return UserRes.builder()
        .id(user.getId())
        .nickname(user.getNickname())
        .location(user.getLocation())
        .region(user.getRegion())
        .hearRate(user.getHeartRate())
        .build();
  }

}
