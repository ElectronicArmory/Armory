package com.electronicarmory.armory.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Program entity.
 */
public class ProgramDTO implements Serializable {

    private Long id;

    @NotNull
    private String programName;

    private String programDescription;

    private Long programPrice;

    private Set<CourseDTO> courses = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getProgramName() {
        return programName;
    }

    public void setProgramName(String programName) {
        this.programName = programName;
    }
    public String getProgramDescription() {
        return programDescription;
    }

    public void setProgramDescription(String programDescription) {
        this.programDescription = programDescription;
    }
    public Long getProgramPrice() {
        return programPrice;
    }

    public void setProgramPrice(Long programPrice) {
        this.programPrice = programPrice;
    }

    public Set<CourseDTO> getCourses() {
        return courses;
    }

    public void setCourses(Set<CourseDTO> courses) {
        this.courses = courses;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProgramDTO programDTO = (ProgramDTO) o;

        if ( ! Objects.equals(id, programDTO.id)) { return false; }

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ProgramDTO{" +
            "id=" + id +
            ", programName='" + programName + "'" +
            ", programDescription='" + programDescription + "'" +
            ", programPrice='" + programPrice + "'" +
            '}';
    }
}
