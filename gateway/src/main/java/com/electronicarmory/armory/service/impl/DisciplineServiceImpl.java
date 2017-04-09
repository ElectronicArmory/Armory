package com.electronicarmory.armory.service.impl;

import com.electronicarmory.armory.service.DisciplineService;
import com.electronicarmory.armory.domain.Discipline;
import com.electronicarmory.armory.repository.DisciplineRepository;
import com.electronicarmory.armory.service.dto.DisciplineDTO;
import com.electronicarmory.armory.service.mapper.DisciplineMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Discipline.
 */
@Service
@Transactional
public class DisciplineServiceImpl implements DisciplineService{

    private final Logger log = LoggerFactory.getLogger(DisciplineServiceImpl.class);
    
    private final DisciplineRepository disciplineRepository;

    private final DisciplineMapper disciplineMapper;

    public DisciplineServiceImpl(DisciplineRepository disciplineRepository, DisciplineMapper disciplineMapper) {
        this.disciplineRepository = disciplineRepository;
        this.disciplineMapper = disciplineMapper;
    }

    /**
     * Save a discipline.
     *
     * @param disciplineDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public DisciplineDTO save(DisciplineDTO disciplineDTO) {
        log.debug("Request to save Discipline : {}", disciplineDTO);
        Discipline discipline = disciplineMapper.disciplineDTOToDiscipline(disciplineDTO);
        discipline = disciplineRepository.save(discipline);
        DisciplineDTO result = disciplineMapper.disciplineToDisciplineDTO(discipline);
        return result;
    }

    /**
     *  Get all the disciplines.
     *  
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DisciplineDTO> findAll() {
        log.debug("Request to get all Disciplines");
        List<DisciplineDTO> result = disciplineRepository.findAllWithEagerRelationships().stream()
            .map(disciplineMapper::disciplineToDisciplineDTO)
            .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }

    /**
     *  Get one discipline by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public DisciplineDTO findOne(Long id) {
        log.debug("Request to get Discipline : {}", id);
        Discipline discipline = disciplineRepository.findOneWithEagerRelationships(id);
        DisciplineDTO disciplineDTO = disciplineMapper.disciplineToDisciplineDTO(discipline);
        return disciplineDTO;
    }

    /**
     *  Delete the  discipline by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Discipline : {}", id);
        disciplineRepository.delete(id);
    }
}
