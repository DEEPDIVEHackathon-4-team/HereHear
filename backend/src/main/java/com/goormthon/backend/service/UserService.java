package com.goormthon.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.goormthon.backend.dto.req.UserReq;
import com.goormthon.backend.dto.res.UserRes;
import com.goormthon.backend.entity.User;
import com.goormthon.backend.repository.UserRepository;


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

  public void userSave(UserReq userReq){
    User user = null;

    if(userReq.getId() == null){
      user = User.of(userReq);
    }else{
      user = userRepository.findById(userReq.getId()).orElseThrow();
      user.update(userReq.getNickname(), userReq.getEmail(), userReq.getPassword());
    }
    
    userRepository.save(user);
  }

  public void userDeleteById(Long id){
    userRepository.deleteById(id);
  }

}
