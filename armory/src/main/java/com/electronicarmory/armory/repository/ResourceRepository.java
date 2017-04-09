package com.electronicarmory.armory.repository;

import com.electronicarmory.armory.domain.Resource;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Resource entity.
 */
@SuppressWarnings("unused")
public interface ResourceRepository extends JpaRepository<Resource,Long> {

}
