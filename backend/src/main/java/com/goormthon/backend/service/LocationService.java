package com.goormthon.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.goormthon.backend.dto.req.LocationReq;
import com.goormthon.backend.repository.LocationRepository;

@Service
public class LocationService {
  @Autowired
  private LocationRepository locationRepository;
  
  public void locationSave(LocationReq locationReq){
    locationRepository.save(null);
  }

  public void locationDeleteById(Long id){
    locationRepository.deleteById(id);
  }
}
