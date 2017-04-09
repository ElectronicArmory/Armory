package com.electronicarmory.armory.service.impl;

import com.electronicarmory.armory.service.ProgramService;
import com.electronicarmory.armory.domain.Program;
import com.electronicarmory.armory.repository.ProgramRepository;
import com.electronicarmory.armory.service.dto.ProgramDTO;
import com.electronicarmory.armory.service.mapper.ProgramMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Program.
 */
@Service
@Transactional
public class ProgramServiceImpl implements ProgramService{

    private final Logger log = LoggerFactory.getLogger(ProgramServiceImpl.class);
    
    private final ProgramRepository programRepository;

    private final ProgramMapper programMapper;

    public ProgramServiceImpl(ProgramRepository programRepository, ProgramMapper programMapper) {
        this.programRepository = programRepository;
        this.programMapper = programMapper;
    }

    /**
     * Save a program.
     *
     * @param programDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ProgramDTO save(ProgramDTO programDTO) {
        log.debug("Request to save Program : {}", programDTO);
        Program program = programMapper.programDTOToProgram(programDTO);
        program = programRepository.save(program);
        ProgramDTO result = programMapper.programToProgramDTO(program);
        return result;
    }

    /**
     *  Get all the programs.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ProgramDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Programs");
        Page<Program> result = programRepository.findAll(pageable);
        return result.map(program -> programMapper.programToProgramDTO(program));
    }

    /**
     *  Get one program by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ProgramDTO findOne(Long id) {
        log.debug("Request to get Program : {}", id);
        Program program = programRepository.findOneWithEagerRelationships(id);
        ProgramDTO programDTO = programMapper.programToProgramDTO(program);
        return programDTO;
    }

    /**
     *  Delete the  program by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Program : {}", id);
        programRepository.delete(id);
    }
}
