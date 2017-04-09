package com.electronicarmory.armory.service;

import com.electronicarmory.armory.service.dto.ResourceDTO;
import java.util.List;

/**
 * Service Interface for managing Resource.
 */
public interface ResourceService {

    /**
     * Save a resource.
     *
     * @param resourceDTO the entity to save
     * @return the persisted entity
     */
    ResourceDTO save(ResourceDTO resourceDTO);

    /**
     *  Get all the resources.
     *  
     *  @return the list of entities
     */
    List<ResourceDTO> findAll();

    /**
     *  Get the "id" resource.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    ResourceDTO findOne(Long id);

    /**
     *  Delete the "id" resource.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
