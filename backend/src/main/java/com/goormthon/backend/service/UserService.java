package com.goormthon.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.goormthon.backend.dto.req.UserReq;
import com.goormthon.backend.dto.res.UserRes;
import com.goormthon.backend.entity.User;
import com.goormthon.backend.repository.UserRepository;

import jakarta.transaction.Transactional;


@Service
public class UserService {
  
  @Autowired
  private UserRepository userRepository;


  public UserRes userFindAll(){
    userRepository.findAll();
    return new UserRes();
  }

  public UserRes userFindById(Long id){
    userRepository.findById(id).orElseThrow();
    return new UserRes();
  }

@Transactional
  public void register(UserReq userReq){

  }

  public void userDeleteById(Long id){
    userRepository.deleteById(id);
  }

}
