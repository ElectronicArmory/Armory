package com.electronicarmory.armory.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.electronicarmory.armory.domain.enumeration.ResourceType;

/**
 * A DTO for the Resource entity.
 */
public class ResourceDTO implements Serializable {

    private Long id;

    private String resourceName;

    private String resourceDescription;

    private String resourceURL;

    private String resourcePreviewImage;

    private ResourceType resourceType;

    private Integer weight;

    private Long disciplineId;

    private Long programId;

    private Long courseId;

    private Long lessonId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getResourceName() {
        return resourceName;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }
    public String getResourceDescription() {
        return resourceDescription;
    }

    public void setResourceDescription(String resourceDescription) {
        this.resourceDescription = resourceDescription;
    }
    public String getResourceURL() {
        return resourceURL;
    }

    public void setResourceURL(String resourceURL) {
        this.resourceURL = resourceURL;
    }
    public String getResourcePreviewImage() {
        return resourcePreviewImage;
    }

    public void setResourcePreviewImage(String resourcePreviewImage) {
        this.resourcePreviewImage = resourcePreviewImage;
    }
    public ResourceType getResourceType() {
        return resourceType;
    }

    public void setResourceType(ResourceType resourceType) {
        this.resourceType = resourceType;
    }
    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public Long getDisciplineId() {
        return disciplineId;
    }

    public void setDisciplineId(Long disciplineId) {
        this.disciplineId = disciplineId;
    }

    public Long getProgramId() {
        return programId;
    }

    public void setProgramId(Long programId) {
        this.programId = programId;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public Long getLessonId() {
        return lessonId;
    }

    public void setLessonId(Long lessonId) {
        this.lessonId = lessonId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ResourceDTO resourceDTO = (ResourceDTO) o;

        if ( ! Objects.equals(id, resourceDTO.id)) { return false; }

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ResourceDTO{" +
            "id=" + id +
            ", resourceName='" + resourceName + "'" +
            ", resourceDescription='" + resourceDescription + "'" +
            ", resourceURL='" + resourceURL + "'" +
            ", resourcePreviewImage='" + resourcePreviewImage + "'" +
            ", resourceType='" + resourceType + "'" +
            ", weight='" + weight + "'" +
            '}';
    }
}
