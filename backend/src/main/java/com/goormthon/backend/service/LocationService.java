package com.goormthon.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.goormthon.backend.dto.req.LocationReq;
import com.goormthon.backend.dto.res.UserRes;
import com.goormthon.backend.entity.Region;
import com.goormthon.backend.entity.User;
import com.goormthon.backend.repository.RegionRepository;
import com.goormthon.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LocationService {

  private final UserRepository userRepository;
  private final RegionRepository regionRepository;

  @Transactional
  public UserRes userLocationSave(LocationReq locationReq){
    User user = userRepository.findById(locationReq.getUserId())
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저"));

    String name = buildRegionName(locationReq.getCity(), locationReq.getDistrict(), locationReq.getSubdistrict());

    Region region = regionRepository.findByName(name)
        .orElseGet(() -> {
          // Region이 없으면 code를 생성해야 함 (법정동코드 규칙에 맞게)
          // 여기서는 임의로 hash를 사용 예시
          Long code = generateRegionCode(name);

          // parentCode를 정해주려면 city/district/subdistrict 계층에 따라 parent 검색 필요
          // 여기서는 parentCode 생략(=null) 또는 추가 로직 필요
          Region newRegion = new Region(code, name, null);
          return regionRepository.save(newRegion);
        });


    user.updateLocation(
        locationReq.getLatitude(),
        locationReq.getLongitude(),
        region
    );

    return UserRes.of(user);
  }

  private String buildRegionName(String city, String district, String subdistrict) {
    // subdistrict가 없을 수도 있으니 null 체크
    if (subdistrict == null || subdistrict.isEmpty()) {
      if (district == null || district.isEmpty()) {
        return city; // 시만 있을 때
      } else {
        return city + " " + district; // 시와 구까지만 있을 때
      }
    }
    return city + " " + district + " " + subdistrict; // 시-구-동
  }

  private Long generateRegionCode(String name) {
    // 실제 법정동코드 매핑 로직 필요하나 여기서는 예로 hash 사용
    return Math.abs(name.hashCode()) + 1000000000L;
  }

}
