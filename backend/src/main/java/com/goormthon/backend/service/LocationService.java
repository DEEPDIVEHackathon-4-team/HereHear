package com.goormthon.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.goormthon.backend.dto.req.LocationReq;
import com.goormthon.backend.dto.res.UserRes;
import com.goormthon.backend.entity.User;
import com.goormthon.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LocationService {

  private final UserRepository userRepository;

  @Transactional
  public UserRes userLocationSave(LocationReq locationReq){
    User user = userRepository.findById(locationReq.getUserId())
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저"));

    user.updateLocation(locationReq.getLatitude(), locationReq.getLongitude(), locationReq.getRegion());
    return UserRes.of(user);
  }

}
