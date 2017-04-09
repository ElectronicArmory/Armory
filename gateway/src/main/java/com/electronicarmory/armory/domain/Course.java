package com.electronicarmory.armory.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.electronicarmory.armory.domain.enumeration.Level;

/**
 * A Course.
 */
@Entity
@Table(name = "course")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Course implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "course_title", nullable = false)
    private String courseTitle;

    @Column(name = "course_description")
    private String courseDescription;

    @Column(name = "course_price")
    private Long coursePrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "course_level")
    private Level courseLevel;

    @OneToMany(mappedBy = "course")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Resource> resources = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "course_lessons",
               joinColumns = @JoinColumn(name="courses_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="lessons_id", referencedColumnName="id"))
    private Set<Lesson> lessons = new HashSet<>();

    @ManyToMany(mappedBy = "courses")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Program> programs = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCourseTitle() {
        return courseTitle;
    }

    public Course courseTitle(String courseTitle) {
        this.courseTitle = courseTitle;
        return this;
    }

    public void setCourseTitle(String courseTitle) {
        this.courseTitle = courseTitle;
    }

    public String getCourseDescription() {
        return courseDescription;
    }

    public Course courseDescription(String courseDescription) {
        this.courseDescription = courseDescription;
        return this;
    }

    public void setCourseDescription(String courseDescription) {
        this.courseDescription = courseDescription;
    }

    public Long getCoursePrice() {
        return coursePrice;
    }

    public Course coursePrice(Long coursePrice) {
        this.coursePrice = coursePrice;
        return this;
    }

    public void setCoursePrice(Long coursePrice) {
        this.coursePrice = coursePrice;
    }

    public Level getCourseLevel() {
        return courseLevel;
    }

    public Course courseLevel(Level courseLevel) {
        this.courseLevel = courseLevel;
        return this;
    }

    public void setCourseLevel(Level courseLevel) {
        this.courseLevel = courseLevel;
    }

    public Set<Resource> getResources() {
        return resources;
    }

    public Course resources(Set<Resource> resources) {
        this.resources = resources;
        return this;
    }

    public Course addResources(Resource resource) {
        this.resources.add(resource);
        resource.setCourse(this);
        return this;
    }

    public Course removeResources(Resource resource) {
        this.resources.remove(resource);
        resource.setCourse(null);
        return this;
    }

    public void setResources(Set<Resource> resources) {
        this.resources = resources;
    }

    public Set<Lesson> getLessons() {
        return lessons;
    }

    public Course lessons(Set<Lesson> lessons) {
        this.lessons = lessons;
        return this;
    }

    public Course addLessons(Lesson lesson) {
        this.lessons.add(lesson);
        lesson.getCourses().add(this);
        return this;
    }

    public Course removeLessons(Lesson lesson) {
        this.lessons.remove(lesson);
        lesson.getCourses().remove(this);
        return this;
    }

    public void setLessons(Set<Lesson> lessons) {
        this.lessons = lessons;
    }

    public Set<Program> getPrograms() {
        return programs;
    }

    public Course programs(Set<Program> programs) {
        this.programs = programs;
        return this;
    }

    public Course addPrograms(Program program) {
        this.programs.add(program);
        program.getCourses().add(this);
        return this;
    }

    public Course removePrograms(Program program) {
        this.programs.remove(program);
        program.getCourses().remove(this);
        return this;
    }

    public void setPrograms(Set<Program> programs) {
        this.programs = programs;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Course course = (Course) o;
        if (course.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, course.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Course{" +
            "id=" + id +
            ", courseTitle='" + courseTitle + "'" +
            ", courseDescription='" + courseDescription + "'" +
            ", coursePrice='" + coursePrice + "'" +
            ", courseLevel='" + courseLevel + "'" +
            '}';
    }
}
