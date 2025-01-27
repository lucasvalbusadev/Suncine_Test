import { Movie, MovieId } from "../movie.entity"

describe("Movie Entity Unit Tests", () => {
  beforeEach(() => {
    Movie.prototype.validate = vi.fn().mockImplementation(Movie.prototype.validate)
  })
  test("constructor of movie", () => {
    let movie = new Movie({
      identifier_code: "12345",
      user_liked: true,
      backdrop_path: "https://image.tmdb.org/t/p/original/8mjYwWT50GkRrrRdyHzJorfEfcl.jpg",
      title: "Gladiador II",
      original_title: "Gladiator II",
      poster_path: "https://image.tmdb.org/t/p/w500/z1hNoGhH12ISnPzPqMOq1QLVGdu.jpg",
      release_date: "2024-11-13T00:00:00.000Z",
      overview: "Movie overview"
    })

    expect(movie.movie_id).toBeInstanceOf(MovieId)
    expect(movie.identifier_code).toBe("12345")
    expect(movie.user_liked).toBe(true)
    expect(movie.backdrop_path).toBe(
      "https://image.tmdb.org/t/p/original/8mjYwWT50GkRrrRdyHzJorfEfcl.jpg"
    )
    expect(movie.title).toBe("Gladiador II")
    expect(movie.original_title).toBe("Gladiator II")
    expect(movie.poster_path).toBe(
      "https://image.tmdb.org/t/p/w500/z1hNoGhH12ISnPzPqMOq1QLVGdu.jpg"
    )
    expect(movie.release_date).toBe("2024-11-13T00:00:00.000Z")
    expect(movie.overview).toBe("Movie overview")
    expect(movie.created_at).toBeInstanceOf(Date)

    const created_at = new Date()
    movie = new Movie({
      identifier_code: "12345",
      user_liked: true,
      backdrop_path: "https://image.tmdb.org/t/p/original/8mjYwWT50GkRrrRdyHzJorfEfcl.jpg",
      title: "Gladiador II",
      original_title: "Gladiator II",
      poster_path: "https://image.tmdb.org/t/p/w500/z1hNoGhH12ISnPzPqMOq1QLVGdu.jpg",
      release_date: "2024-11-13T00:00:00.000Z",
      overview: "Movie overview",
      created_at
    })
    expect(movie.movie_id).toBeInstanceOf(MovieId)
    expect(movie.identifier_code).toBe("12345")
    expect(movie.user_liked).toBe(true)
    expect(movie.backdrop_path).toBe(
      "https://image.tmdb.org/t/p/original/8mjYwWT50GkRrrRdyHzJorfEfcl.jpg"
    )
    expect(movie.title).toBe("Gladiador II")
    expect(movie.original_title).toBe("Gladiator II")
    expect(movie.poster_path).toBe(
      "https://image.tmdb.org/t/p/w500/z1hNoGhH12ISnPzPqMOq1QLVGdu.jpg"
    )
    expect(movie.release_date).toBe("2024-11-13T00:00:00.000Z")
    expect(movie.overview).toBe("Movie overview")
    expect(movie.created_at).toBe(created_at)
  })

  describe("create command", () => {
    it("should create a movie", () => {
      let movie = Movie.create({
        identifier_code: "12345",
        user_liked: true,
        backdrop_path: "https://image.tmdb.org/t/p/original/8mjYwWT50GkRrrRdyHzJorfEfcl.jpg",
        title: "Gladiador II",
        original_title: "Gladiator II",
        poster_path: "https://image.tmdb.org/t/p/w500/z1hNoGhH12ISnPzPqMOq1QLVGdu.jpg",
        release_date: "2024-11-13T00:00:00.000Z",
        overview: "Movie overview"
      })

      expect(movie.movie_id).toBeInstanceOf(MovieId)
      expect(movie.identifier_code).toBe("12345")
      expect(movie.user_liked).toBe(true)
      expect(movie.backdrop_path).toBe(
        "https://image.tmdb.org/t/p/original/8mjYwWT50GkRrrRdyHzJorfEfcl.jpg"
      )
      expect(movie.title).toBe("Gladiador II")
      expect(movie.original_title).toBe("Gladiator II")
      expect(movie.poster_path).toBe(
        "https://image.tmdb.org/t/p/w500/z1hNoGhH12ISnPzPqMOq1QLVGdu.jpg"
      )
      expect(movie.release_date).toBe("2024-11-13T00:00:00.000Z")
      expect(movie.overview).toBe("Movie overview")
      expect(movie.created_at).toBeInstanceOf(Date)

      const created_at = new Date()
      movie = Movie.create({
        identifier_code: "12345",
        user_liked: true,
        backdrop_path: "https://image.tmdb.org/t/p/original/8mjYwWT50GkRrrRdyHzJorfEfcl.jpg",
        title: "Gladiador II",
        original_title: "Gladiator II",
        poster_path: "https://image.tmdb.org/t/p/w500/z1hNoGhH12ISnPzPqMOq1QLVGdu.jpg",
        release_date: "2024-11-13T00:00:00.000Z",
        overview: "Movie overview",
        created_at
      })
      expect(movie.movie_id).toBeInstanceOf(MovieId)
      expect(movie.identifier_code).toBe("12345")
      expect(movie.user_liked).toBe(true)
      expect(movie.backdrop_path).toBe(
        "https://image.tmdb.org/t/p/original/8mjYwWT50GkRrrRdyHzJorfEfcl.jpg"
      )
      expect(movie.title).toBe("Gladiador II")
      expect(movie.original_title).toBe("Gladiator II")
      expect(movie.poster_path).toBe(
        "https://image.tmdb.org/t/p/w500/z1hNoGhH12ISnPzPqMOq1QLVGdu.jpg"
      )
      expect(movie.release_date).toBe("2024-11-13T00:00:00.000Z")
      expect(movie.overview).toBe("Movie overview")
      expect(movie.created_at).toBe(created_at)
    })
  })

  describe("movie id field", () => {
    const arrange = [{ id: null }, { id: undefined }, { id: new MovieId() }]

    test.each(arrange)("should be is %j", (props) => {
      const movie = new Movie(props as any)
      expect(movie.movie_id).toBeInstanceOf(MovieId)
      expect(movie.entityId).toBeInstanceOf(MovieId)
    })
  })

  test("toJSON method", () => {
    let movie = Movie.create({
      identifier_code: "12345",
      user_liked: true,
      backdrop_path: "https://image.tmdb.org/t/p/original/8mjYwWT50GkRrrRdyHzJorfEfcl.jpg",
      title: "Gladiador II",
      original_title: "Gladiator II",
      poster_path: "https://image.tmdb.org/t/p/w500/z1hNoGhH12ISnPzPqMOq1QLVGdu.jpg",
      release_date: "2024-11-13T00:00:00.000Z",
      overview: "Movie overview"
    }).toJson()

    expect(movie.movie_id).toBeDefined()
    expect(movie.identifier_code).toBe("12345")
    expect(movie.user_liked).toBe(true)
    expect(movie.backdrop_path).toBe(
      "https://image.tmdb.org/t/p/original/8mjYwWT50GkRrrRdyHzJorfEfcl.jpg"
    )
    expect(movie.title).toBe("Gladiador II")
    expect(movie.original_title).toBe("Gladiator II")
    expect(movie.poster_path).toBe(
      "https://image.tmdb.org/t/p/w500/z1hNoGhH12ISnPzPqMOq1QLVGdu.jpg"
    )
    expect(movie.release_date).toBe("2024-11-13T00:00:00.000Z")
    expect(movie.overview).toBe("Movie overview")
    expect(movie.created_at).toBeInstanceOf(Date)

    const created_at = new Date()
    movie = Movie.create({
      identifier_code: "12345",
      user_liked: true,
      backdrop_path: "https://image.tmdb.org/t/p/original/8mjYwWT50GkRrrRdyHzJorfEfcl.jpg",
      title: "Gladiador II",
      original_title: "Gladiator II",
      poster_path: "https://image.tmdb.org/t/p/w500/z1hNoGhH12ISnPzPqMOq1QLVGdu.jpg",
      release_date: "2024-11-13T00:00:00.000Z",
      overview: "Movie overview",
      created_at
    }).toJson()
    expect(movie.movie_id).toBeDefined()
    expect(movie.identifier_code).toBe("12345")
    expect(movie.user_liked).toBe(true)
    expect(movie.backdrop_path).toBe(
      "https://image.tmdb.org/t/p/original/8mjYwWT50GkRrrRdyHzJorfEfcl.jpg"
    )
    expect(movie.title).toBe("Gladiador II")
    expect(movie.original_title).toBe("Gladiator II")
    expect(movie.poster_path).toBe(
      "https://image.tmdb.org/t/p/w500/z1hNoGhH12ISnPzPqMOq1QLVGdu.jpg"
    )
    expect(movie.release_date).toBe("2024-11-13T00:00:00.000Z")
    expect(movie.overview).toBe("Movie overview")
    expect(movie.created_at).toBe(created_at)
  })
})

describe("Movie Validator", () => {
  describe("create command", () => {
    test("should an invalid movie with backdrop_path property", () => {
      const user = Movie.create({
        identifier_code: "12345",
        user_liked: true,
        backdrop_path: "wrong_path",
        title: "Gladiador II",
        original_title: "Gladiator II",
        poster_path: "https://image.tmdb.org/t/p/w500/z1hNoGhH12ISnPzPqMOq1QLVGdu.jpg",
        release_date: "2024-11-13T00:00:00.000Z",
        overview: "Movie overview"
      })

      expect(user.notification.hasErrors()).toBe(true)
      expect(user.notification.toJson()).toStrictEqual([
        {
          backdrop_path: ["backdrop_path must be a URL address"]
        }
      ])
    })

    test("should an invalid movie with poster_path property", () => {
      const user = Movie.create({
        identifier_code: "12345",
        user_liked: true,
        backdrop_path: "https://image.tmdb.org/t/p/w500/z1hNoGhH12ISnPzPqMOq1QLVGdu.jpg",
        title: "Gladiador II",
        original_title: "Gladiator II",
        poster_path: "wrong_path",
        release_date: "2024-11-13T00:00:00.000Z",
        overview: "Movie overview"
      })

      expect(user.notification.hasErrors()).toBe(true)
      expect(user.notification.toJson()).toStrictEqual([
        {
          poster_path: ["poster_path must be a URL address"]
        }
      ])
    })

    test("should an invalid movie with release_date property", () => {
      const user = Movie.create({
        identifier_code: "12345",
        user_liked: true,
        backdrop_path: "https://image.tmdb.org/t/p/w500/z1hNoGhH12ISnPzPqMOq1QLVGdu.jpg",
        title: "Gladiador II",
        original_title: "Gladiator II",
        poster_path: "https://image.tmdb.org/t/p/w500/z1hNoGhH12ISnPzPqMOq1QLVGdu.jpg",
        release_date: new Date() as any,
        overview: "Movie overview"
      })

      expect(user.notification.hasErrors()).toBe(true)
      expect(user.notification.toJson()).toStrictEqual([
        {
          release_date: ["release_date must be a valid ISO 8601 date string"]
        }
      ])
    })
  })
})
