package com.goormthon.backend.service;

import org.springframework.stereotype.Service;

import com.goormthon.backend.dto.req.LocationReq;
import com.goormthon.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LocationService {

  private final UserRepository userRepository;

  public void userLocationSave(LocationReq locationReq){
    userRepository.findById(locationReq.getUserId()).orElseThrow();

  }

}
