package com.electronicarmory.armory.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.electronicarmory.armory.service.CourseService;
import com.electronicarmory.armory.web.rest.util.HeaderUtil;
import com.electronicarmory.armory.web.rest.util.PaginationUtil;
import com.electronicarmory.armory.service.dto.CourseDTO;
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
 * REST controller for managing Course.
 */
@RestController
@RequestMapping("/api")
public class CourseResource {

    private final Logger log = LoggerFactory.getLogger(CourseResource.class);

    private static final String ENTITY_NAME = "course";
        
    private final CourseService courseService;

    public CourseResource(CourseService courseService) {
        this.courseService = courseService;
    }

    /**
     * POST  /courses : Create a new course.
     *
     * @param courseDTO the courseDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new courseDTO, or with status 400 (Bad Request) if the course has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/courses")
    @Timed
    public ResponseEntity<CourseDTO> createCourse(@Valid @RequestBody CourseDTO courseDTO) throws URISyntaxException {
        log.debug("REST request to save Course : {}", courseDTO);
        if (courseDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new course cannot already have an ID")).body(null);
        }
        CourseDTO result = courseService.save(courseDTO);
        return ResponseEntity.created(new URI("/api/courses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /courses : Updates an existing course.
     *
     * @param courseDTO the courseDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated courseDTO,
     * or with status 400 (Bad Request) if the courseDTO is not valid,
     * or with status 500 (Internal Server Error) if the courseDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/courses")
    @Timed
    public ResponseEntity<CourseDTO> updateCourse(@Valid @RequestBody CourseDTO courseDTO) throws URISyntaxException {
        log.debug("REST request to update Course : {}", courseDTO);
        if (courseDTO.getId() == null) {
            return createCourse(courseDTO);
        }
        CourseDTO result = courseService.save(courseDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, courseDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /courses : get all the courses.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of courses in body
     */
    @GetMapping("/courses")
    @Timed
    public ResponseEntity<List<CourseDTO>> getAllCourses(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Courses");
        Page<CourseDTO> page = courseService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/courses");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /courses/:id : get the "id" course.
     *
     * @param id the id of the courseDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the courseDTO, or with status 404 (Not Found)
     */
    @GetMapping("/courses/{id}")
    @Timed
    public ResponseEntity<CourseDTO> getCourse(@PathVariable Long id) {
        log.debug("REST request to get Course : {}", id);
        CourseDTO courseDTO = courseService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(courseDTO));
    }

    /**
     * DELETE  /courses/:id : delete the "id" course.
     *
     * @param id the id of the courseDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/courses/{id}")
    @Timed
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        log.debug("REST request to delete Course : {}", id);
        courseService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
