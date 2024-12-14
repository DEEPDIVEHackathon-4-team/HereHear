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

    Region region = regionRepository.findByCityAndDistrictAndSubdistrict(
            locationReq.getCity(),
            locationReq.getDistrict(),
            locationReq.getSubdistrict()
        )
        .orElseGet(() -> {
          Region newRegion = Region.of(locationReq.getCity(), locationReq.getDistrict(), locationReq.getSubdistrict());
          return regionRepository.save(newRegion); // 새로운 Region 저장
        });

    user.updateLocation(
        locationReq.getLatitude(),
        locationReq.getLongitude(),
        region
    );

    // Step 4: 결과 반환
    return UserRes.of(user);
  }

}
