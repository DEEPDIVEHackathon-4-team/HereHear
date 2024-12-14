package com.goormthon.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.goormthon.backend.dto.req.LocationReq;
import com.goormthon.backend.dto.req.UserRegisterRequestDto;
import com.goormthon.backend.dto.res.CommonRes;
import com.goormthon.backend.dto.res.UserRes;
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

    @GetMapping("")
    public CommonRes<?> getUser(@RequestParam Long id) {
      try {
        UserRes data = userService.userFindById(id);
        return new CommonRes<>(200, "SUCCESS", data);
      } catch (Exception e) {
        return new CommonRes<>(400, "Bad Request", null);
      }
    }

    @PostMapping("")
    public CommonRes<?> addUser(@RequestBody UserRegisterRequestDto dto) {
      userService.register(dto);
      return new CommonRes<>(200, "SUCCESS", null);
    }

    @PutMapping("{id}")
    public String putUser(@PathVariable String id, @RequestBody String entity) {
        //TODO: process PUT request

        return entity;
    }
    @DeleteMapping("")
    public String deleteUser(@RequestParam String param) {
        return new String();
    }

    @GetMapping("/location")
    public String getLocation(@RequestParam String param) {
        return new String();
    }

    @PostMapping("/location")
    public String addLocation(@RequestBody LocationReq dto) {

      return "";
    }
    @PutMapping("{id}")
    public String putLocation(@PathVariable String id, @RequestBody String entity) {
        //TODO: process PUT request

        return entity;
    }
    @DeleteMapping("")
    public String deleteLocation(@RequestParam String param) {
        return new String();
    }
  
}
