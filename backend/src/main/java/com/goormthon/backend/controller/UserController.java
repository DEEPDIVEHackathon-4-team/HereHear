package com.goormthon.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RestController;

import com.goormthon.backend.dto.req.LocationReq;
import com.goormthon.backend.dto.req.UserRegisterRequestDto;
import com.goormthon.backend.dto.req.UserUpdateRequestDto;
import com.goormthon.backend.dto.res.CommonRes;
import com.goormthon.backend.dto.res.UserRes;
import com.goormthon.backend.service.LocationService;
import com.goormthon.backend.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final LocationService locationService;

    @GetMapping
    public CommonRes<?> getUser(@RequestParam Long id) {
      try {
        UserRes data = userService.userFindById(id);
        return new CommonRes<>(200, "SUCCESS", data);
      } catch (Exception e) {
        return new CommonRes<>(400, "Bad Request", null);
      }
    }

    @GetMapping("/all")
    public CommonRes<?> getAllUsers() {
        List<UserRes> users = userService.userFindAll();
        return new CommonRes<>(200, "SUCCESS", users);
    }

    @PostMapping("")
    public CommonRes<?> addUser(@RequestBody UserRegisterRequestDto dto) {
        UserRes userRes = userService.register(dto);
        return new CommonRes<>(200, "SUCCESS", userRes);
    }

    @PutMapping("")
    public CommonRes<?> update(@RequestBody UserUpdateRequestDto dto) {
        UserRes userRes = userService.update(dto);
        return new CommonRes<>(200, "SUCCESS", userRes);
    }

    @DeleteMapping("")
    public CommonRes<?> deleteUser(@RequestParam Long id) {
        userService.userDeleteById(id);
        return new CommonRes<>(200, "SUCCESS", null);
    }


    // @GetMapping("/location")
    // public String getLocation(@RequestParam String param) {
    //     return new String();
    // }

    @PostMapping("/location")
    public CommonRes<?> addLocation(@RequestBody LocationReq dto) {
        // locationService.locationSave(dto);
        return new CommonRes<>(200, "SUCCESS", null);
    }

    @PutMapping("{id}")
    public String putLocation(@PathVariable String id, @RequestBody String entity) {
        //TODO: process PUT request

        return entity;
    }
    // @DeleteMapping("/location")
    // public String deleteLocation(@RequestParam String param) {
    //     return new String();
    // }
  
}
