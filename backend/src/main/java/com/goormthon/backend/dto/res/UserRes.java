package com.goormthon.backend.dto.res;

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
  private Double latitude;
  private Double longitude;
  private Integer hearRate;
  private Region region;

  @Builder
  public static UserRes of(User user) {
    return UserRes.builder()
        .id(user.getId())
        .nickname(user.getNickname())
        .latitude(user.getLatitude())
        .longitude(user.getLongitude())
        .region(user.getRegion())
        .hearRate(user.getHeartRate())
        .build();
  }

}
