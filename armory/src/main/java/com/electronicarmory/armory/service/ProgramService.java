package com.electronicarmory.armory.service;

import com.electronicarmory.armory.service.dto.ProgramDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

/**
 * Service Interface for managing Program.
 */
public interface ProgramService {

    /**
     * Save a program.
     *
     * @param programDTO the entity to save
     * @return the persisted entity
     */
    ProgramDTO save(ProgramDTO programDTO);

    /**
     *  Get all the programs.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<ProgramDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" program.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    ProgramDTO findOne(Long id);

    /**
     *  Delete the "id" program.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
