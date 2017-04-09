package com.electronicarmory.armory.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.electronicarmory.armory.service.ProgramService;
import com.electronicarmory.armory.web.rest.util.HeaderUtil;
import com.electronicarmory.armory.web.rest.util.PaginationUtil;
import com.electronicarmory.armory.service.dto.ProgramDTO;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST controller for managing Program.
 */
@RestController
@RequestMapping("/api")
public class ProgramResource {

    private final Logger log = LoggerFactory.getLogger(ProgramResource.class);

    private static final String ENTITY_NAME = "program";
        
    private final ProgramService programService;

    public ProgramResource(ProgramService programService) {
        this.programService = programService;
    }

    /**
     * POST  /programs : Create a new program.
     *
     * @param programDTO the programDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new programDTO, or with status 400 (Bad Request) if the program has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/programs")
    @Timed
    public ResponseEntity<ProgramDTO> createProgram(@Valid @RequestBody ProgramDTO programDTO) throws URISyntaxException {
        log.debug("REST request to save Program : {}", programDTO);
        if (programDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new program cannot already have an ID")).body(null);
        }
        ProgramDTO result = programService.save(programDTO);
        return ResponseEntity.created(new URI("/api/programs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /programs : Updates an existing program.
     *
     * @param programDTO the programDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated programDTO,
     * or with status 400 (Bad Request) if the programDTO is not valid,
     * or with status 500 (Internal Server Error) if the programDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/programs")
    @Timed
    public ResponseEntity<ProgramDTO> updateProgram(@Valid @RequestBody ProgramDTO programDTO) throws URISyntaxException {
        log.debug("REST request to update Program : {}", programDTO);
        if (programDTO.getId() == null) {
            return createProgram(programDTO);
        }
        ProgramDTO result = programService.save(programDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, programDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /programs : get all the programs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of programs in body
     */
    @GetMapping("/programs")
    @Timed
    public ResponseEntity<List<ProgramDTO>> getAllPrograms(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Programs");
        Page<ProgramDTO> page = programService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/programs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /programs/:id : get the "id" program.
     *
     * @param id the id of the programDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the programDTO, or with status 404 (Not Found)
     */
    @GetMapping("/programs/{id}")
    @Timed
    public ResponseEntity<ProgramDTO> getProgram(@PathVariable Long id) {
        log.debug("REST request to get Program : {}", id);
        ProgramDTO programDTO = programService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(programDTO));
    }

    /**
     * DELETE  /programs/:id : delete the "id" program.
     *
     * @param id the id of the programDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/programs/{id}")
    @Timed
    public ResponseEntity<Void> deleteProgram(@PathVariable Long id) {
        log.debug("REST request to delete Program : {}", id);
        programService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
