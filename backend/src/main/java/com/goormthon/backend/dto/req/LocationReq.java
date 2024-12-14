package com.goormthon.backend.dto.req;

import lombok.Getter;


@Getter
public class LocationReq {
    private Long userId;
    private Double latitude;
    private Double longitude;
    private String city;
    private String district;
    private String subdistrict;
}
