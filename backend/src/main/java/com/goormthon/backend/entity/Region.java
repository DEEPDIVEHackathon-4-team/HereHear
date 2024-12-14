package com.goormthon.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
@AllArgsConstructor
public class Region {

	@Id
	private Long code; // 법정동코드 (예: 1100000000, 1111000000, 1111010100)

	private String name; // 법정동명 (예: "서울특별시", "서울특별시 종로구", "서울특별시 종로구 청운동")

	@Column(nullable = true)
	private Long parentCode; // 상위 지역의 법정동코드 (시 -> 구 -> 동로 내려갈수록 parentCode를 통해 상위 식별)

	public boolean isRoot() {
		return this.parentCode == null;
	}
}
